'use strict';

/**
 * @function
 * @description get first n records from a model
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function first(howMany, callback) {
        //check how many records are needed
        //default to 1 if not explicit provided
        if (howMany && !_.isNumber(howMany)) {
            callback = howMany;
            howMany = 1;
        }
        //we are not sure if callback 
        //was provided too
        else {
            howMany = howMany || 1;
        }

        //initialize Deferred style
        //query builder
        var query = model.find();

        //start from offset 0
        query.skip(0);

        //limit to how many required
        query.limit(howMany);

        //if callback provided
        //execute the query
        if (_.isFunction(callback)) {
            return query.exec(callback);
        }

        //otherwise return the deferred object
        else {
            return query;
        }

    };

    //attach first
    //to the model
    model.first = first;
}
