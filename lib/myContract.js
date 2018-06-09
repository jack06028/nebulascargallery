"use strict";


var Cargallery = function () {
    LocalContractStorage.defineMapProperty(this, "arrayMap");
    LocalContractStorage.defineMapProperty(this, "dataMap");
    LocalContractStorage.defineProperty(this, "size");
}


var CargalleryItem = function (_id, carname, carthumb, carmainpic,carcontent, pubTime,author) {
    this._id = _id;
    this.carname = carname;
    this.carthumb = carthumb;
    this.carmainpic = carmainpic;
    this.carcontent = carcontent;
    this.pubTime = pubTime;
    this.author = author;
}

CargalleryItem.prototype.toString = function () {
    return JSON.stringify(this);
};


Cargallery.prototype = {
    init: function () {
        this.size = 0;
    },
    set: function (carname, carthumb, carpicture,carcontent, carpubTime) {
        var carauthor = Blockchain.transaction.from;
        var value = new CargalleryItem(this.size, carname, carthumb, carpicture, carcontent,carpubTime,carauthor);
        var index = this.size;
        this.arrayMap.set(index,carauthor+index);
        this.dataMap.set(carauthor+index, value);
        this.size += 1;
    },
    getarraymap:function(){
        return this.arrayMap.get(0);
    },
    len: function () {
        return this.size;
    },
    forEach: function (limit, offset) {
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (offset > this.size) {
            throw new Error("offset is not valid");
        }
        var number = offset + limit;
        if (number > this.size) {
            number = this.size;
        }
        var result = [];
        for (var i = offset; i < number; i++) {
            var key = this.arrayMap.get(i);
            var val = this.dataMap.get(key);
            val && result.push(val);
        }
        return result;
    },
    _getdataByautohor: function (author) {
        var result = [];
        for (var i = 0; i < this.size; i++) {
            var key = this.arrayMap.get(i);
            if(key == author+i){
                var val = this.dataMap.get(key);
                val && result.push(val);
            }
        }
        return result;
    },
    getAll: function () {
        return this.forEach(this.size, 0);
    },
    getinfoByauthor: function (author) {
        return this._getdataByautohor(author);
    },
    getSize: function () {
        return this.size;
    },
    del: function (index) {
        return this.dataMap.del(index);
    }
};
module.exports = Cargallery;
