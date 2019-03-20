const getAllImages = (pictures) => {
  pictures = [...pictures].map((picture) => {
    return `
      <img src="${picture}" class="point__destination-image" alt="picture from place"></img>
    `.trim();
  }).join(``);

  return `
    <div class="point__destination-images">
      ${pictures}
    </div>
  `;
};

export {getAllImages};
