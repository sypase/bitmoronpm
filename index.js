class bitmoroService {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.apiUrl = 'https://api.bitmoro.com/message/api';
      this.otpMap = new Map();
    }
  
    async sendMessage(message, phoneNumber) {
      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };
  
      const body = {
        'number': phoneNumber,
        'message': message
      };
  
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    }
  
    async sendOtp(number, time = 10) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const message = `Your OTP is: ${otp}`;
      const response = await this.sendMessage(message, number);
  
      if (response.message === 'Message sent') {
        this.otpMap.set(number, { otp, timestamp: Date.now() + time * 1000, resendTimestamp: Date.now() + 60 * 1000 });
        return otp;
      } else {
        throw new Error('Error sending OTP');
      }
    }
  
    async verifyOtp(number, otp) {
      const otpData = this.otpMap.get(number);
  
      if (!otpData) {
        throw new Error('OTP not found');
      }
  
      if (otpData.otp !== otp) {
        throw new Error('Invalid OTP');
      }
  
      if (Date.now() > otpData.timestamp) {
        throw new Error('OTP expired');
      }
  
      this.otpMap.delete(number);
      return true;
    }
  
    async resendOtp(number) {
      const otpData = this.otpMap.get(number);
  
      if (!otpData) {
        throw new Error('OTP not found');
      }
  
      if (Date.now() < otpData.resendTimestamp) {
        throw new Error('You can resend OTP after 1 minute');
      }
  
      const newOtp = Math.floor(100000 + Math.random() * 900000);
      const message = `Your new OTP is: ${newOtp}`;
      const response = await this.sendMessage(message, number);
  
      if (response.message === 'Message sent') {
        this.otpMap.set(number, { otp: newOtp, timestamp: Date.now() + 10 * 1000, resendTimestamp: Date.now() + 60 * 1000 });
        return newOtp;
      } else {
        throw new Error('Error resending OTP');
      }
    }
  
  }
  
  export default bitmoroService;