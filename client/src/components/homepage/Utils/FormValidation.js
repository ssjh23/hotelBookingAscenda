import data from '../destinations.json'

export function validate(submission){
    // Refactored that the check for valid search is only done after the submit button is pressed
    let errors = {};
    let foundCountry = [];
    console.log(submission)
    data.every((country) => {
        if(country.term === submission.searchBarResult && country.term !== undefined){
          foundCountry = [country.term, country.uid, country.lat, country.lng, country.type];
          return false;
        }
        return true
    })
    console.log(foundCountry)
    if (foundCountry.length === 0){
        errors.name = "Please select a location from the list";
    }
    if(submission.startDateResult >= submission.endDateResult){
        errors.date = "Please select an appropriate date range";
    }
    if(submission.adultsResult + submission.childrenResult > 4){
        errors.totalguests = "The total number of guests per room cannot be more than 4"
    }
    return errors;
}
