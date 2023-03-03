import { atom } from 'recoil';

const ShowHelp = atom({
  key: 'ShowHelp', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default ShowHelp;
