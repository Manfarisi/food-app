import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="expore-menu-text">
        Explore our diverse menu featuring a wide selection of delicious dishes,
        from savory appetizers to mouthwatering main courses and delightful
        desserts. Each dish is crafted with fresh ingredients to ensure the best
        flavors and quality. Whether you're craving a classic favorite or
        looking to try something new, our menu offers something for everyone.
        Order now and enjoy a satisfying meal delivered straight to you
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={()=>
                setCategory(prev=> prev===item.menu_name ? "All" : item.menu_name)
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
        <hr />
      </div>
    </div>
  );
};

export default ExploreMenu;
