"use strict";


var Headstorm = function () {
    LocalContractStorage.defineMapProperty(this, "dataMap");
    LocalContractStorage.defineProperty(this, "size");
}


var HeadstormItem = function (_id, name, email, content, pubTime,author) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.content = content;
    this.pubTime = pubTime;
    this.author = author;
}

HeadstormItem.prototype.toString = function () {
    return JSON.stringify(this);
};


Headstorm.prototype = {
    init: function () {
        this.size = 0;
    },
    _createRounmember: function (count, member) {
        var arr = [];
        for (var i = 0; i < count; i++) {              
            var n = Math.round(Math.random() * member);
            var off = false; //假设随机出来数字不重复                
            for (var j = 0; j < arr.length; j++) {
                if (n == arr[j]) {
                    off = true;
                    break;
                }
            }
            if (off) {
                i--
            } else {
                arr.push(n);
            }
        }
        return arr;
    },
    set: function (hname, hemail, hcontent, hpubTime) {
        var hauthor = Blockchain.transaction.from;
        var value = new HeadstormItem(this.size, hname, hemail, hcontent, hpubTime,hauthor);
        var index = this.size;
        this.dataMap.set(index, value);
        this.size += 1;
    },
    get: function (index) {
        return this.dataMap.get(index);
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
            var val = this.dataMap.get(i);
            val && result.push(val);
        }
        return result;
    },
    getAll: function () {
        return this.forEach(this.size, 0);
    },
    getinfoBycount: function (count) {
        var arr = [];
        if(count >= this.size){
            return this.getAll();
        }
        var sirarry = this._createRounmember(count,this.size);
        for(var i = 0;i<sirarry.length;i++){
            var val = this.dataMap.get(i);
            val && arr.push(val);
        }
        return arr;
    },
    getSize: function () {
        return this.size;
    },
    del: function (index) {
        return this.dataMap.del(index);
    }
};
module.exports = Headstorm;
