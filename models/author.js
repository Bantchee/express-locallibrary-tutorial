const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, require: true, maxLength: 100 },
    family_name: { type: String, require: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
    // To avoid errors in case where an author does not have either a family name of first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if(this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    if(!this.first_name || !this.family_name) {
        fullname = "";
    }

    return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/author/${this._id}`;
});

// Virtual Property of formatted author's date_of_birth
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    return this.date_of_birth ?
        DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) :
        '';
});

// Virtual Property of formatted author's date_of_death
AuthorSchema.virtual("date_of_death_formatted").get(function () {
    return this.date_of_death ?
        DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) :
        '';
});

// Virtual Property date of birth as YYYY_MM_DD format
AuthorSchema.virtual("date_of_birth_YYYY_MM_DD").get(function () {
    return this.date_of_birth ?
        DateTime.fromJSDate(this.date_of_birth).toISODate() :
        '';
});

// Virtual Property date of death as YYYY_MM_DD format
AuthorSchema.virtual("date_of_death_YYYY_MM_DD").get(function () {
    return this.date_of_birth ?
        DateTime.fromJSDate(this.date_of_death).toISODate() :
        '';
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);