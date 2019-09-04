// transform the raw recipe data from the API
// into an array of recipe objects

const getId = item => item && item["sys"] && item["sys"]["id"];

const getNameForObj = (obj, entries) => {
  const idx = entries.findIndex(entry => getId(entry) === getId(obj));
  return idx >= 0 ? entries[idx]["fields"]["name"] : "";
};

const getTagNames = (tags = [], entries) => {
  if (!tags) {
    return [];
  }
  return tags.map(tag => getNameForObj(tag, entries));
};

const findPhotoUrl = (photo, assets) => {
  const idx = assets.findIndex(asset => getId(asset) === getId(photo));
  return idx >= 0 ? assets[idx]["fields"]["file"]["url"] : "";
};

const transformRecipes = json => {
  const { items, includes } = json;
  const { Entry: entries, Asset: assets } = includes;
  return items.map(item => {
    const { fields } = item;
    const { calories, description, photo, tags, title, chef } = fields;
    const id = getId(item);
    return {
      id,
      title,
      calories,
      description,
      photo: photo ? findPhotoUrl(photo, assets) : "",
      tags: getTagNames(tags, entries),
      chef: chef ? getNameForObj(chef, entries) : ""
    };
  });
};

export default transformRecipes;
