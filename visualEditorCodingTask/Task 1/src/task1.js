// Write a simple transaction system for array­based data in JavaScript. You have a document that is
// structured as a long array of individual characters:

// var doc = ['C', 'o', 'd', 'i', 'n', 'g', ' ', 't', 'a', 's', 'k', ' ', '1', '\n', 'W', 'r', 'i',
// 't', 'e' /* , ....etc. */ ];

// Write a transaction system for this document format. The transaction system should:

// allow callers to create transactions and apply them allow a single transaction to insert and/or
// remove any number of characters at any number of positions example: changing "Coding task" to
// "CdiNg ta sk" should be possible in a single transaction

// allow callers to roll back transactions

// ensure correct order of operations

// this should leave the document in the exact same state as right before the transaction was
// committed

// you don't need to worry about protecting against transactions being rolled back out­of­order

// a transaction that has already been applied cannot be applied again

// a transaction that has not yet been applied, cannot be rolled back

// a transaction that has been applied and rolled back, cannot be rolled back again, but can be
// reapplied

var docArray = function(doc) {
  if (!Array.isArray(doc)) {
    throw new TypeError('parameter must be an array');
  }
  this.pastTransactions = [''];
  this.pastVersions = [doc.slice()];
}


// docArray.prototype.get returns the current version of the document

docArray.prototype.get = function() {
  return this.pastVersions[this.pastVersions.length - 1];
}


// docArray.prototype.transact takes any number of paramArrays
// paramArray includes these parameters [index, deleteCount, itemToAdd]. itemToAdd is optional.

docArray.prototype.transact = function(paramArray) {
  var newVersion = this.get().slice();
  var transactions = Array.prototype.slice.call(arguments, 0).sort(function(a, b) {
    return b[0] - a[0];
  });

  if (this.pastTransactions.indexOf(JSON.stringify(transactions)) !== -1) {
    throw new Error('transaction already applied');
  }

  for (var i = 0; i < transactions.length; i++) {
    Array.prototype.splice.apply(newVersion, transactions[i]);
  }

  this.pastTransactions.push(JSON.stringify(transactions));
  this.pastVersions.push(newVersion);

  return(newVersion);
}


// docArray.prototype.rollback rolls back to previous version and stops at original document version

docArray.prototype.rollback = function() {
  var transactions = this.pastTransactions;
  var versions = this.pastVersions;
  var lastIndex = transactions.length - 1;
  if (transactions.length > 1) {
    transactions.splice(lastIndex, 1);
    versions.splice(lastIndex, 1);
  } else {
    throw new Error('no transaction to rollback');
  }
  return versions[lastIndex - 1];
}
