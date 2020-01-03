const assert = require('chai').assert;
const sinon = require('sinon');
const {StreamSelector} = require('../src/streamSelector');

describe('StreamSelector', () => {
  let stdin, createReadStream, streamSelector;

  beforeEach(() => {
    stdin = {};
    createReadStream = sinon.stub().withArgs('filePath').returns({fileName: 'filePath'});
    streamSelector = new StreamSelector(stdin, createReadStream);
  });

  it('should select createReadStream in case of file ', () => {
    assert.deepStrictEqual(streamSelector.select('filePath'), {fileName: 'filePath'});
  });

  it('should select stdin in the absence of file ', () => {
    assert.deepStrictEqual(streamSelector.select(), {});
  });
});
