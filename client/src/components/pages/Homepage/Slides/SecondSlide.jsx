import React from "react";
import Button from "react-bootstrap/Button";
import cl from "../HomePage.module.css";
import icon1 from "../Iconly/icon1.png";
import icon2 from "../Iconly/icon2.png";
import icon3 from "../Iconly/icon3.png";
import icon4 from "../Iconly/icon4.png";

const SecondSlide = () => {
  const token = localStorage.getItem("token");

  return (
    <div
     >
      <div className="container">
        <div className="text-center text-white m-4">
          <h2 className={`${cl.header_SecondSlide}`}>Выбирайте удобный формат сотрудничества</h2>
        </div>
        <div
          className={`w-100 d-flex py-3 align-items-center justify-content-around text-center`}
        >
          <div
            className={`${cl.format_zadanie}`}
          >
            <div className={`${cl.word_SecondSlide}`}>
              {" "}
              Создайте{" "}
              <span className={`${cl.frilans_proect}`}> фриланс проетк</span>
            </div>
            <span  className={`${cl.text_SecondSlide}`}>
              получите лучшие предложения по цене, срокам от фрилансеров
            </span>
              <br/>
              <div className={`${cl.SecondSlide_img_btn}`}>
                  <button className={`${cl.btn_zakaz}`}> Разместить Заказ</button>
                  <img className={`${cl.image_SecondSlide}`} src="https://freelancehunt.com/static/images/frontpage/clock_man.png" alt=""/>
              </div>

          </div>
          <div
            className={` ${cl.format_zadanie}`}
          >
            {/*<img src={icon2} alt="" className="my-3" />*/}
            <h5 className={`${cl.frilans_proect}`}>Выбираете в каталоге исполнителя</h5>
            <span className={`${cl.text_SecondSlide}`}>
            и фрилансеры предложат
            уже готовые решения
            </span><br/>

                <div className={`${cl.SecondSlide_img_btn}`}>
                    <button className={`${cl.btn_zakaz}`}> Выбрать фрилансера</button>
                    <img className={`${cl.image_SecondSlide}`}  src="https://freelancehunt.com/static/images/frontpage/bulb_man.png" alt=""/>
                </div>

          </div>
        </div>
        <div className="mt-5">
          <Button
            href={token ? "/tasks" : "/signIn"}
            variant="outline-light p-3"
          >
            Начни прямо сейчас
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondSlide;
