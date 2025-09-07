export default class ExtendInfo {
    isExtended = false;
    extendType = 'default';

    constructor(isExtended = false, extendType = 'default') {
        this.extendType = extendType;
        this.isExtended = isExtended;
    }
}