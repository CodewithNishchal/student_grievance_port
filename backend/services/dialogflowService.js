import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DialogflowService {
  constructor() {
    // Initialize Dialogflow client with service account
    const keyFilePath = path.resolve(__dirname, '../../service_account.json');
    
    try {
      this.sessionClient = new SessionsClient({
        keyFilename: keyFilePath
      });
      
      // Get project ID from service account file
      this.projectId = process.env.DIALOGFLOW_PROJECT_ID || 'dbms-knrw';
      this.languageCode = 'en-US';
      this.isConfigured = true;
    } catch (error) {
      console.warn('⚠️  Dialogflow service account not found or invalid.');
      console.warn('⚠️  Please place service_account.json in the project root.');
      console.warn('⚠️  The chatbot will return mock responses until configured.');
      this.isConfigured = false;
      this.projectId = process.env.DIALOGFLOW_PROJECT_ID || 'dbms-knrw';
      this.languageCode = 'en-US';
    }
  }

  /**
   * Send a text query to Dialogflow
   * @param {string} sessionId - Unique session ID for the conversation
   * @param {string} query - User's query text
   * @returns {Promise<Object>} Dialogflow response
   */
  async detectIntent(sessionId, query) {
    // If Dialogflow is not configured, return a helpful message
    if (!this.isConfigured) {
      return {
        success: true,
        fulfillmentText: 'Hello! I\'m currently in demo mode. Please configure Dialogflow by placing your service_account.json file in the project root and restarting the server. For help, check the CHATBOT_README.md file.',
        intent: 'demo.mode',
        confidence: 1.0,
        parameters: {},
        allRequiredParamsPresent: true,
      };
    }

    try {
      // Create session path
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        this.projectId,
        sessionId
      );

      // The text query request
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: this.languageCode,
          },
        },
      };

      // Send request and get response
      const responses = await this.sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      return {
        success: true,
        fulfillmentText: result.fulfillmentText,
        intent: result.intent ? result.intent.displayName : 'No intent matched',
        confidence: result.intentDetectionConfidence,
        parameters: result.parameters,
        allRequiredParamsPresent: result.allRequiredParamsPresent,
      };
    } catch (error) {
      console.error('Error in Dialogflow detectIntent:', error);
      return {
        success: false,
        error: error.message,
        fulfillmentText: 'Sorry, I encountered an error. Please try again.',
      };
    }
  }

  /**
   * Generate a unique session ID
   * @returns {string} UUID session ID
   */
  generateSessionId() {
    return uuidv4();
  }

  /**
   * Get context information for a session
   * @param {string} sessionId - Session ID
   * @returns {Promise<Array>} List of active contexts
   */
  async getContexts(sessionId) {
    try {
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        this.projectId,
        sessionId
      );

      const request = {
        parent: sessionPath,
      };

      const [contexts] = await this.sessionClient.listContexts(request);
      return contexts;
    } catch (error) {
      console.error('Error getting contexts:', error);
      return [];
    }
  }

  /**
   * Create a context for a session
   * @param {string} sessionId - Session ID
   * @param {string} contextName - Name of the context
   * @param {Object} parameters - Context parameters
   * @param {number} lifespanCount - Number of queries the context should survive
   */
  async createContext(sessionId, contextName, parameters = {}, lifespanCount = 5) {
    try {
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        this.projectId,
        sessionId
      );

      const contextPath = `${sessionPath}/contexts/${contextName}`;

      const context = {
        name: contextPath,
        lifespanCount: lifespanCount,
        parameters: parameters,
      };

      const request = {
        parent: sessionPath,
        context: context,
      };

      await this.sessionClient.createContext(request);
      return { success: true };
    } catch (error) {
      console.error('Error creating context:', error);
      return { success: false, error: error.message };
    }
  }
}

export default DialogflowService;
