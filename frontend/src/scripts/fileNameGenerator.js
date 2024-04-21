function fileNameGenerator(name) {
    const lowercaseString = name.toLowerCase();
    const stringWithoutSpaces = lowercaseString.replace(/\s+/g, '');

    const timestamp = Date.now();
    const stringWithTimestamp = stringWithoutSpaces + "_" + timestamp;

    return stringWithTimestamp;
}

export default fileNameGenerator