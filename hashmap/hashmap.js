export class HashMap{
    constructor(){
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = [];
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
        this.count = 0;
    }
    hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

    return hashCode;
    }
    set(key,value){
        const idx = this.hash(key);
        if (idx < 0 || idx >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++){
            if (bucket[i][0] === key){
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.count++;
        if (this.count / this.capacity > this.loadFactor) {
            this._resize();
         }
    }
    _resize() {
        const oldBuckets  = this.buckets;
        this.capacity    *= 2;
        this.count        = 0;
        this.buckets      = [];
    
        
        for (let i = 0; i < this.capacity; i++) {
          this.buckets[i] = [];
        }
        for (const bucket of oldBuckets) {
            for (const [k, v] of bucket) {
              this.set(k, v);
            }
        }
    }
    get(key) {
        const idx    = this.hash(key);
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }
    
    has(key) {
        const idx    = this.hash(key);
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }
    remove(key){
        const idx = this.has(key);
        const bucket = this.buckets[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false;
    }
    length() {
        return this.count;
    }
    clear() {
        this.count   = 0;
        this.buckets = [];
        this.capacity = 16;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
          for (const [k, _] of bucket) {
            allKeys.push(k);
          }
        }
        return allKeys;
    }
    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
          for (const [_, v] of bucket) {
            allValues.push(v);
          }
        }
        return allValues;
      }
    
    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                allEntries.push([pair[0], pair[1]]);
            }
        }
        return allEntries;
    }
}