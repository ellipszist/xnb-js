import BaseReader from "./BaseReader.js";
import BufferReader from "../BufferReader.js";
import BufferWriter from "../BufferWriter.js";
import Int32Reader from "./Int32Reader.js";

/**
 * TBin Reader
 * @class
 * @extends BaseReader
 */
export default class TBinReader extends BaseReader {
	read(buffer) {
		const int32Reader = new Int32Reader();

		// read in the size of the data block
		let size = int32Reader.read(buffer);
		// read in the data block
		let data = buffer.read(size);

		// return the data
		return { export: { type: this.type, data } };
	}

	write(buffer, content, resolver) {
		this.writeIndex(buffer, resolver);
		const int32Reader = new Int32Reader();
		int32Reader.write(buffer, content.data.length, null);
		buffer.concat(content.data);
	}

	isValueType() {
		return false;
	}
}
