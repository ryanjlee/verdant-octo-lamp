describe('Task 1:', function() {

  var doc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var docInstance;

  beforeEach(function() {
    docInstance = new docArray(doc);
  });
  

  it('should only allow arrays to be passed as a parameter', function() {
    expect(function() {
      new docArray(1);
    }).toThrowError(TypeError, 'parameter must be an array');
    
    expect(function() {
      new docArray('a');
    }).toThrowError(TypeError, 'parameter must be an array');
    
    expect(function() {
      new docArray({a: 1});
    }).toThrowError(TypeError, 'parameter must be an array');
    
    expect(function() {
      new docArray([0, 1, 2]);
    }).not.toThrowError(TypeError, 'parameter must be an array');
  });


  describe('transact method', function() {
    it('should it be able to create an instance of a document and be able to return it', function() {
      expect(docInstance.get()).toEqual(doc);
    });

    it('should allow transactions to be made', function() {
      expect(docInstance.transact([3, 1, 'a'])).toEqual([0, 1, 2, 'a', 4, 5, 6, 7, 8, 9]);
      expect(docInstance.get()).toEqual([0, 1, 2, 'a', 4, 5, 6, 7, 8, 9]);
    });

    it('should allow a single transaction to insert any number of characters at any number of positions', function() {
      docInstance.transact([3, 0, 'a'], [5, 0, 'b', 'c'], [9, 0, 'd', 'e', 'f']);
      expect(docInstance.get()).toEqual([0, 1, 2, 'a', 3, 4, 'b', 'c', 5, 6, 7, 8, 'd', 'e', 'f', 9]);
    });

    it('should allow a single transaction to remove any number of characters at any number of positions', function() {
      docInstance.transact([0, 3], [5, 2], [9, 1]);
      expect(docInstance.get()).toEqual([3, 4, 7, 8]);
    });

    it('should allow a single transaction to add and/or remove any number of characters at any number of positions', function() {
      docInstance.transact([0, 2, 'a'], [5, 1, 'b', 'c'], [7, 3, 'd', 'e', 'f']);
      expect(docInstance.get()).toEqual(['a', 2, 3, 4, 'b', 'c', 6, 'd', 'e', 'f']);
    });
  });
  
  describe('rollback method', function() {
    beforeEach(function() {
      docInstance.transact([0, 3, 'a']);
      docInstance.transact([6, 2, 'b', 'c', 'd']);
    });

    it('should leave the document in the exact same state as right before the transaction was committed', function() {
      var result = docInstance.rollback();
      expect(result).not.toEqual(['a', 3, 4, 5, 6, 7, 'b', 'c', 'd']);
      expect(result).toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
      expect(docInstance.get()).toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should rollback to the right version when rollback is used more than once', function() {
      docInstance.rollback();
      result = docInstance.rollback();
      expect(result).not.toEqual(['a', 3, 4, 5, 6, 7, 'b', 'c', 'd']);
      expect(result).not.toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(docInstance.get()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('correct order of operations', function() {
    it('should not allow a transaction that has already been applied to be applied again', function() {
      docInstance.transact([0, 3, 'a']);
      expect(function() {
        docInstance.transact([0, 3, 'a'])
      }).toThrowError(Error, 'transaction already applied');
      expect(docInstance.get()).toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should not allow a transaction that has not yet been applied, to be rolled back', function() {
      expect(function() {
        docInstance.rollback()
      }).toThrowError(Error, 'no transaction to rollback');
      expect(docInstance.get()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should allow a transaction that has been applied and rolled back, to be reapplied', function() {
      docInstance.transact([0, 3, 'a']);
      expect(docInstance.get()).toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
      
      docInstance.rollback();
      expect(docInstance.get()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      
      docInstance.transact([0, 3, 'a']);
      expect(docInstance.get()).toEqual(['a', 3, 4, 5, 6, 7, 8, 9]);
    });
  })
});
