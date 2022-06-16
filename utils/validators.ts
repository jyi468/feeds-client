const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const required = value => (value ? undefined : 'Required');

const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);

const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than or equal to ${min}`;

const maxValue = max => value =>
    isNaN(value) || value <= max ? undefined : `Should be less than or equal to ${max}`;

const pattern = (regex, errorMessage) => value => regex.test(value) ? undefined : errorMessage;

export {required, mustBeNumber, minValue, maxValue, pattern, composeValidators};