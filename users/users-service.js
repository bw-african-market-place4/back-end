module.exports = {
    isValid,
    allFields,
    allItemFields
  };
  
  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }
  
  function allFields(user) {
    return Boolean(user.username && user.password && user.email && user.name && user.businessName && user.terms);
  }
  
   
  function allItemFields(item) {
    return Boolean(item.location && item.name && item.description && item.price);
  }
  