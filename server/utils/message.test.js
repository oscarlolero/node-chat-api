let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Jen';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
      var from = 'Deb';
      var latitude = 15;
      var longitude = 19;
      var url = 'https://www.google.com/maps?q=15,19';
      var message = generateLocationMessage(from, latitude, longitude);
  
      expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({from, url});
    });
  });