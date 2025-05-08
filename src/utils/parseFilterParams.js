import { CONTACT_TYPES } from '../constants/index.js';

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  if (CONTACT_TYPES.includes(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
