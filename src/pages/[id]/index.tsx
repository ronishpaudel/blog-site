import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";
import Ad from "@/components/Ad";
import { useRouter } from "next/router";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";

const index: FC = () => {
  const { push, query } = useRouter();

  const onHandlePush = () => {
    return push("/auth");
  };
  return (
    <div>
      <Header />

      <div className="page-wrapper">
        <div className="blog-info">
          <Tag />
          <h1>
            {query.title}
            <br />
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>

          <Author />
        </div>
        <img src="/img.png" className="blog-image" />
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            {query.description}
            <br />
            Traveling is an enriching experience that opens up new horizons,
            exposes us to different cultures, and creates memories that last a
            lifetime. However, traveling can also be stressful and overwhelming,
            especially if you don't plan and prepare adequately. In this blog
            article, we'll explore tips and tricks for a memorable journey and
            how to make the most of your travels.
          </p>
          <br />
          <p>
            One of the most rewarding aspects of traveling is immersing yourself
            in the local culture and customs. This includes trying local
            cuisine, attending cultural events and festivals, and interacting
            with locals. Learning a few phrases in the local language can also
            go a long way in making connections and showing respect.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Research Your Destination
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            Before embarking on your journey, take the time to research your
            destination. This includes understanding the local culture, customs,
            and laws, as well as identifying top attractions, restaurants, and
            accommodations. Doing so will help you navigate your destination
            with confidence and avoid any cultural faux pas.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. In
            hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum
            faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod
            elementum nisi quis eleifend quam adipiscing vitae. Viverra
            adipiscing at in tellus.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Plan Your Itinerary
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            While it's essential to leave room for spontaneity and unexpected
            adventures, having a rough itinerary can help you make the most of
            your time and budget. Identify the must-see sights and experiences
            and prioritize them according to your interests and preferences.
            This will help you avoid overscheduling and ensure that you have
            time to relax and enjoy your journey.
          </p>
          <br />
          <p>
            Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis
            lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget
            felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
          </p>
        </div>
        <div className="blog-box">
          <p>
            “ Traveling can expose you to new environments and potential health
            risks, so it's crucial to take precautions to stay safe and healthy.
            ”
          </p>
        </div>
        <img src="/man.png" className="blog-image" />
        <Ad style={{ margin: "0" }} />
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Pack Lightly and Smartly
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            Packing can be a daunting task, but with some careful planning and
            smart choices, you can pack light and efficiently. Start by making a
            packing list and sticking to it, focusing on versatile and
            comfortable clothing that can be mixed and matched. Invest in
            quality luggage and packing organizers to maximize space and
            minimize wrinkles.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Stay Safe and Healthy
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            Traveling can expose you to new environments and potential health
            risks, so it's crucial to take precautions to stay safe and healthy.
            This includes researching any required vaccinations or medications,
            staying hydrated, washing your hands frequently, and using sunscreen
            and insect repellent. It's also essential to keep your valuables
            safe and secure and to be aware of your surroundings at all times.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Immerse Yourself in the Local Culture
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            One of the most rewarding aspects of traveling is immersing yourself
            in the local culture and customs. This includes trying local
            cuisine, attending cultural events and festivals, and interacting
            with locals. Learning a few phrases in the local language can also
            go a long way in making connections and showing respect.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Capture Memories
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            Finally, don't forget to capture memories of your journey. Whether
            it's through photographs, journaling, or souvenirs, preserving the
            moments and experiences of your travels can bring joy and nostalgia
            for years to come. However, it's also essential to be present in the
            moment and not let technology distract you from the beauty of your
            surroundings.
          </p>
        </div>
        <h3
          style={{
            alignSelf: "flex-start",
            color: " #181A2A",
            fontWeight: "600",
          }}
        >
          Conclusion:
        </h3>
        <div style={{ color: "#3B3C4A", fontWeight: "400" }}>
          <p>
            Traveling is an art form that requires a blend of planning,
            preparation, and spontaneity. By following these tips and tricks,
            you can make the most of your journey and create memories that last
            a lifetime. So pack your bags, embrace the adventure, and enjoy the
            ride.
          </p>
        </div>
        <button onClick={onHandlePush}>auth</button>
      </div>

      <Footer />
    </div>
  );
};

export default PrivateRoute(index);
