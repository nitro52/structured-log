import { expect } from 'chai';
import MessageTemplate from '../src/messageTemplate';

describe('MessageTemplate', () => {
  it('should properly tokenize a template string', () => {
    const mt = new MessageTemplate('Happy {age}th birthday, {name}!');

    expect(mt.tokens.length).to.equal(5);
    expect(mt.tokens.filter(t => t.name === 'age')).to.not.be.empty;
    expect(mt.tokens.filter(t => t.name === 'name')).to.not.be.empty;
  });

  it('should correctly render a message', () => {
    const mt = new MessageTemplate('Happy {age}th birthday, {name}!');
    const message = mt.render({ age: 30, name: 'Fred' });

    expect(message).to.equal('Happy 30th birthday, Fred!');
  });

  it('should correctly render a message without any parameters', () => {
    const mt = new MessageTemplate('Happy 30th birthday, Fred!');
    const message = mt.render();

    expect(message).to.equal('Happy 30th birthday, Fred!');
  });

  it('should correctly render a message with destructured parameters', () => {
    const mt = new MessageTemplate('Hello, {@person}!');
    const message = mt.render({ person: { firstName: 'Leeroy', lastName: 'Jenkins' } });

    expect(message).to.equal('Hello, {"firstName":"Leeroy","lastName":"Jenkins"}!');
  });
});
