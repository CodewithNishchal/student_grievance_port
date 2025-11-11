class DialogflowService {
  constructor() {
    this.backendURL = 'http://localhost:5000';
  }

  async sendMessage(text, sessionId = 'default-session') {
    try {
      const response = await fetch(`${this.backendURL}/dialogflow/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        fulfillmentText: data.fulfillment_text || 'I understand your concern.',
        intent: data.intent || 'Unknown',
        confidence: data.confidence || 0,
        sessionId: sessionId,
      };
    } catch (error) {
      console.error('Error sending message to Dialogflow:', error);
      return {
        success: false,
        fulfillmentText: 'I encountered an error. Please try again.',
        error: error.message,
      };
    }
  }

  createSession() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new DialogflowService();
