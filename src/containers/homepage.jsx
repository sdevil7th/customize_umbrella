import React from "react";
import styles from "./homepage.module.scss";
import "./homepage.scss";

import { ReactComponent as Loader } from "../media/loader_icon.svg";
import { ReactComponent as UploadIcon } from "../media/upload_icon.svg";
import { ReactComponent as RemoveIcon } from "../media/close.svg";
import blueUmbrella from "../media/blue_umbrella.png";
import yellowUmbrella from "../media/yellow_umbrella.png";
import pinkUmbrella from "../media/pink_umbrella.png";

import { validateFile } from "../utils/fileValidation";

const colors = [
  {
    color: "blue",
    className: styles.blueUmbrella,
    imgSrc: blueUmbrella,
  },
  {
    color: "yellow",
    className: styles.yellowUmbrella,
    imgSrc: yellowUmbrella,
  },
  {
    color: "pink",
    className: styles.pinkUmbrella,
    imgSrc: pinkUmbrella,
  },
];

class Homepage extends React.Component {
  state = {
    selectedIndex: 0,
    uploadImageInput: null,
    uploadedImage: null,
    loading: false,
  };

  onChangeColor(colorIndex) {
    if (colorIndex === this.state.selectedIndex) {
      return;
    }
    this.setLoading(true);
    this.setState({ selectedIndex: colorIndex });
    // setTimeout used to show the loader, otherwise it'd be instant and loader won't be shown
    setTimeout(() => {
      this.setLoading(false);
    }, 3000);
  }

  onChangeUploadedFile(files) {
    if (!files.length) {
      return;
    }
    if (!validateFile(files[0])) {
      return;
    }
    this.setLoading(true);
    // setTimeout used to show the loader, otherwise it'd be instant and loader won't be shown
    setTimeout(() => {
      this.setState({
        uploadImageInput: files[0],
        uploadedImage: URL.createObjectURL(files[0]),
      });
      this.setLoading(false);
    }, 3000);
  }

  setLoading(bool) {
    this.setState({ loading: bool });
  }

  onClickRemoveLogo(event) {
    this.setLoading(true);
    // setTimeout used to show the loader, otherwise it'd be instant and loader won't be shown
    setTimeout(() => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ uploadedImage: null, uploadImageInput: null });
      this.setLoading(false);
    }, 2000);
  }

  render() {
    return (
      <div
        className={`${styles.container} ${
          colors[this.state.selectedIndex].className
        }`}
      >
        <div className={styles.imgContainer}>
          {this.state.loading ? (
            <React.Fragment>
              <Loader className={styles.loader} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={colors[this.state.selectedIndex].imgSrc}
                alt="umbrella_img"
                className={styles.umbrellaImg}
              />
              {this.state.uploadedImage ? (
                <img
                  className={styles.logoImg}
                  alt="uploaded_logo"
                  src={this.state.uploadedImage}
                />
              ) : (
                ""
              )}
            </React.Fragment>
          )}
        </div>
        <div className={styles.selectorContainer}>
          <h1>Custom Umbrella</h1>
          <div className={styles.colorSelectorContainer}>
            {colors.map((item, index) => (
              <div
                key={"colorSelector" + index}
                onClick={() => this.onChangeColor(index)}
                className={`colorSelector ${item.color + "Circle"} ${
                  index === this.state.selectedIndex ? "selected" : ""
                }`}
              ></div>
            ))}
          </div>
          <h3>Customize your umbrella</h3>
          <p className="bodyText">Upload a logo for an instant preview.</p>
          <p className="captionText">
            .png and .jpg files only. Max file size is 5MB.
          </p>
          <label className={styles.fileUploadInput}>
            {this.state.uploadImageInput
              ? this.state.uploadImageInput.name
              : "UPLOAD LOGO"}
            <UploadIcon className={styles.uploadIcon} />
            <input
              type="file"
              onChange={(event) =>
                this.onChangeUploadedFile(event.target.files)
              }
            />
            {this.state.uploadImageInput ? (
              <RemoveIcon
                onClick={(event) => this.onClickRemoveLogo(event)}
                className={styles.removeIcon}
              />
            ) : (
              ""
            )}
          </label>
        </div>
      </div>
    );
  }
}

export default Homepage;
