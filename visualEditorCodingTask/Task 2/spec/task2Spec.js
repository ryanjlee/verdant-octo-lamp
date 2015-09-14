describe('Task 2:', function() {
  var doc;
  var result;
  var tree;

  describe('createTree method', function() {
    it('should handle documents with a single element', function() {
      doc = ['<p>', 'H', 'e', 'l', 'l', 'o', '</p>'];
      result = {
        'type': 'document',
        'length': 7,
        'children': [
          {
            'type': 'p',
            'length': 5,
            'children': []
          }
        ]
      };
      expect(createTree(doc)).toEqual(result);
    });

    it('should handle documents with nested elements', function() {
      doc = ['<ul>', '<li>', 'H', 'i', '<div>','</div>', '</li>', '</ul>'];
      result = {
        'type': 'document',
        'length': 8,
        'children': [
          {
            'type': 'ul',
            'length': 6,
            'children': [
              {
                'type': 'li',
                'length': 4,
                'children': [
                  {
                    'type': 'div',
                    'length': 0,
                    'children': []
                  }
                ]
              }
            ]
          }
        ]
      };
      expect(createTree(doc)).toEqual(result);
    });

    it('should handle documents with nested elements and multiple children', function() {
      doc = ['<p>', 'O', 'n', 'e', '</p>', '<ul>', '<li>', 'T', 'w', 'o', '</li>', '<li>', 'T', 'h', 'r', 'e', 'e', '</li>', '</ul>', '<div>', '</div>'];
      result = {
        'type': 'document',
        'length': 21,
        'children': [
          {
            'type': 'p',
            'length': 3,
            'children': []
          },
          {
            'type': 'ul',
            'length': 12,
            'children': [
              {
                'type': 'li',
                'length': 3,
                'children': []
              },
              {
                'type': 'li',
                'length': 5,
                'children': []
              }
            ]
          },
          {
            'type': 'div',
            'length': 0,
            'children': []
          }
        ]
      };
      expect(createTree(doc)).toEqual(result);
    });

    it('should throw error if document does not start with an element tag', function() {
      doc = ['e', 'r', 'r', 'o', 'r'];
      expect(function() {
        createTree(doc)
      }).toThrowError(Error, 'invalid document');
    });

    it('should throw error if document is missing a closing element tag', function() {
      doc = ['<p>', 'e', 'r', 'r', 'o', 'r'];
      expect(function() {
        createTree(doc)
      }).toThrowError(Error, 'invalid document');
    });

    it('should throw error if document is invalid', function() {
      doc = ['<p>', '<div>', '</p>', '</div>'];
      expect(function() {
        createTree(doc)
      }).toThrowError(Error, 'invalid document');
    });
  });

  describe('findNode method', function() {
    beforeEach(function() {
      doc = ['<p>', 'O', 'n', 'e', '</p>', '<ul>', '<li>', 'T', 'w', 'o', '</li>', '<li>', 'T', 'h', 'r', 'e', 'e', '</li>', '</ul>', '<div>', '</div>'];
      tree = createTree(doc);
    });

    it('should be able to locate nodes on the top level of the tree', function() {
      result = {
        'type': 'p',
        'length': 3,
        'children': []
      };
      expect(findNode(tree, 3)).toEqual(result);
    });

    it('should be able to locate nested nodes in the tree', function() {
      result = {
        'type': 'li',
        'length': 3,
        'children': []
      };
      expect(findNode(tree, 8)).toEqual(result);
    });

    it('should be able to locate the correct node when the index is pointing to the opening tag of an element', function() {
      result = {
        'type': 'ul',
        'length': 12,
        'children': [
          {
            'type': 'li',
            'length': 3,
            'children': []
          },
          {
            'type': 'li',
            'length': 5,
            'children': []
          }
        ]
      };
      expect(findNode(tree, 6)).toEqual(result);
    });

    it('should be able to locate the correct node when the index is pointing to the closing tag of an element', function() {
      result = {
        'type': 'document',
        'length': 21,
        'children': [
          {
            'type': 'p',
            'length': 3,
            'children': []
          },
          {
            'type': 'ul',
            'length': 12,
            'children': [
              {
                'type': 'li',
                'length': 3,
                'children': []
              },
              {
                'type': 'li',
                'length': 5,
                'children': []
              }
            ]
          },
          {
            'type': 'div',
            'length': 0,
            'children': []
          }
        ]
      };
      expect(findNode(tree, 4)).toEqual(result);
    });

    it('should never point to an empty node', function() {
      result = {
        'type': 'document',
        'length': 21,
        'children': [
          {
            'type': 'p',
            'length': 3,
            'children': []
          },
          {
            'type': 'ul',
            'length': 12,
            'children': [
              {
                'type': 'li',
                'length': 3,
                'children': []
              },
              {
                'type': 'li',
                'length': 5,
                'children': []
              }
            ]
          },
          {
            'type': 'div',
            'length': 0,
            'children': []
          }
        ]
      };
      var incorrectResult = {
        'type': 'div',
        'length': 0,
        'children': []
      };
      expect(findNode(tree, 20)).not.toEqual(incorrectResult);
      expect(findNode(tree, 20)).toEqual(result);
    });
  });

});
