import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { baseApiURL } from "../../baseUrl";

const Content = () => {
  const { fullname } = useSelector((state) => state.userData);
  const [subject, setSubject] = useState();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    link: "",
    faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
  });

  useEffect(() => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  const addContentHandler = () => {
    toast.loading("Adding Content");
    const headers = {
      "Content-Type": "application/json",
    };

    // Assuming you have an API endpoint for adding content
    axios
      .post(`${baseApiURL()}/content/addContent`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            link: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
          });
          setYoutubeLink(""); // Reset youtubeLink after successful submission
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Content`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-[80%] mt-2">
            <label htmlFor="title">Content Title</label>
            <input
              type="text"
              id="title"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
          </div>
          <div className="w-[80%] mt-2">
            <label htmlFor="subject">Content Subject</label>
            <select
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) =>
                setSelected({ ...selected, subject: e.target.value })
              }
              className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1 w-full"
            >
              <option defaultValue value="select">
                -- Select Subject --
              </option>
              {subject &&
                subject.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[80%] mt-2">
            <label htmlFor="youtubeLink">YouTube Link</label>
            <input
              type="text"
              id="youtubeLink"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
            onClick={() =>
              setSelected(
                (prevSelected) => ({ ...prevSelected, link: youtubeLink }),
                addContentHandler
              )
            }
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;

