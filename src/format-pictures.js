const getAllImages = (pictures) => {
  const picturesLayout = [...pictures].map((picture) => {
    return `
      <img src="${picture}" class="point__destination-image" alt="picture from place"></img>
    `.trim();
  }).join(``);

  return `
    <div class="point__destination-images">
      ${picturesLayout}
    </div>
  `;
};

export {getAllImages};
