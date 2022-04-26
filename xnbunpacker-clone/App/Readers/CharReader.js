import BaseReader from "./BaseReader.js";
import BufferReader from "../BufferReader.js";
import BufferWriter from "../BufferWriter.js";

/**
 * Char Reader
 * @class
 * @extends BaseReader
 */
export default class CharReader extends BaseReader {
	/**
	 * Reads Char from the buffer.
	 * @param {BufferReader} buffer
	 * @returns {String}
	 */
	read(buffer) {
		let charSize = this._getCharSize(buffer.peek(1).readInt8());
		return buffer.read(charSize).toString('utf8');
	}

	/**
	 * Writes Char into buffer
	 * @param {BufferWriter} buffer
	 * @param {Mixed} data
	 * @param {ReaderResolver}
	 */
	write(buffer, content, resolver) {
		this.writeIndex(buffer, resolver);
		buffer.writeString(content);
	}

	/**
	 * Gets size of char for some special characters that are more than one byte.
	 * @param {Number} byte
	 * @returns {Number}
	 */
	_getCharSize(byte) {
		return (( 0xE5000000 >> (( byte >> 3 ) & 0x1e )) & 3 ) + 1;
	}
}