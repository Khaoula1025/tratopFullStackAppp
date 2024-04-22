import formFields from "../formFields.json";

export function parseFormData(type) {
  console.log("Type:", type); // Log the type to ensure it's what you expect

  // Find the first object in the 'fields' array
  const fieldsObject = formFields.data[0].fields[0];

  // Extract commonFields and uniqueFields
  const commonFields = fieldsObject.commonFields || [];
  const uniqueFields = fieldsObject.uniqueFields || [];

  console.log("Common Fields:", commonFields); // Log commonFields to inspect their structure
  //function extractOptions(fields) {
  function logFieldTypes(fields) {
    // Filter fields to only include those of type "select"
    const selectFields = fields.filter((field) => {
      return field.type === "select";
    });
    const storeOptionsByTypes = selectFields.forEach((field) => {
      console.log(field.options["for3D"]);
    });
    // Log the filtered fields
    console.log(storeOptionsByTypes);
  }

  console.log("function types:", logFieldTypes(commonFields)); // Log uniqueFields to inspect their structure

  //   console.log('Common Fields options:', commonFields[0].options.for3D); // Log commonFields to inspect their structure
  //console.log("Unique Fields:", uniqueFields); // Log uniqueFields to inspect their structure

  const extractOptions = (fields, type) => {
    fields
      .filter(
        (field) =>
          field.type === "select" && field.options && field.options[type]
      )
      .map((field) => {
        console.log("field :", field); // Log the field to inspect its structure
        return field.options[type];
      })
      .flat();
  };

  // Extract options for commonFields and uniqueFields
  //commonFields.

  //const commonOptions = extractOptions(commonFields);
  //const uniqueOptions = extractOptions(uniqueFields);

  //console.log('Common Options extracted:', commonOptions); // Log commonOptions to see what's extracted
  // console.log('Unique Options extracted:', uniqueOptions); // Log uniqueOptions to see what's extracted

  return { commonFields, uniqueFields };
}
