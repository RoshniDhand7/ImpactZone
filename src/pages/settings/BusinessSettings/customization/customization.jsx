import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Upload from "../../../../assets/icons/upload.png";

const Customization = () => {
  // const [uploadImage, setShowfile] = useState();
  const getImageName = (el) => {
    var input = document.getElementById("file-input");
    console.log(input.files[0]);
    var fileName = input.files[0].name;
    var textArea = document.getElementById("file-name");
    textArea.textContent = fileName;
    document.getElementById("showImage").hidden = false;
    document.getElementById("showImage").src = URL.createObjectURL(
      input.files[0]
    );
  };

  return (
    <>
      <div className="my-2">
        <div>
          <CardWithTitle title="Customization">
            <div className="p-2  flex">
              <div className="col-3   ">
                <div className="mb-1 ">
                  <label
                    HtmlFor=""
                    className="text-xs text-dark-gray font-bold"
                  >
                    Logo
                  </label>
                </div>

                <div className="image-upload border-1 border-100 bg-white flex justify-content-between  border-round p-2">
                  <div
                    className="flex"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <img
                      id="showImage"
                      src=""
                      alt=""
                      hidden
                      style={{ marginRight: "9px" }}
                    />
                    <div id="file-name"></div>
                  </div>

                  <div class="image-upload">
                    <label for="file-input">
                      <img
                        style={{ width: "16px", height: "16px" }}
                        src={Upload}
                        alt=""
                      />
                    </label>
                    <input
                      id="file-input"
                      onChange={getImageName}
                      name="file-input"
                      type="file"
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Input title="ThemeColor"></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3 p-2">
          <div className="mx-5">
            <Buttons
              label="Save"
              className="mx-3 btn-dark border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-5 static b-0 ">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Customization;
