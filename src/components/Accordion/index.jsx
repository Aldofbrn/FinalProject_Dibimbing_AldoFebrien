import React from 'react';
import { Accordion } from 'flowbite-react';
import haikeiCircle from '../../assets/haikeiCircle.svg';

const AccordionHome = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${haikeiCircle})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container py-8">
          <div className="flex justify-center">
            <Accordion className="w-[80%] md:w-8/12">
              <Accordion.Panel>
                <Accordion.Title className="hover:bg-fourth text-black focus:bg-fourth transition-all duration-500">
                  How can I earn and redeem Miles Points?
                </Accordion.Title>
                <Accordion.Content className="bg-gray-500/20 backdrop-blur-lg ">
                  <p className="mb-2 text-black ">
                    You earn Miles Points every time you book flights, hotels,
                    or tours through our platform. The points accumulate in your
                    account and can be redeemed for discounts on future
                    bookings. Look out for special promotions to earn bonus
                    points and make your trips even more rewarding!
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="hover:bg-tertiary text-black focus:bg-tertiary transition-all duration-300">
                  Does Miles offer 24/7 customer support?
                </Accordion.Title>
                <Accordion.Content className="bg-gray-500/20 backdrop-blur-lg ">
                  <p className="mb-2 text-black">
                    Yes, Miles provides 24/7 customer support to ensure your
                    travel experience is stress-free. Whether you need help with
                    a booking, face an issue during your trip, or have
                    questions, our team is always here for you. You can contact
                    us anytime via live chat, email, or phone.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="hover:bg-fourth text-black focus:bg-fourth transition-all duration-300 ">
                  Can I book group travel through Miles?
                </Accordion.Title>
                <Accordion.Content className="bg-gray-500/20 backdrop-blur-lg ">
                  <p className="mb-2 text-black">
                    Yes, group travel is one of our specialties! Whether you’re
                    planning a family vacation, a corporate retreat, or a group
                    tour, we can customize the perfect itinerary. Our team
                    handles everything from booking to coordination, so you can
                    focus on enjoying your trip.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="hover:bg-tertiary text-black focus:bg-tertiary transition-all duration-500 ">
                  Are there any hidden fees when booking through Miles?
                </Accordion.Title>
                <Accordion.Content className="bg-gray-500/20 backdrop-blur-lg ">
                  <p className="mb-2 text-black ">
                    No, Miles believes in complete transparency when it comes to
                    pricing. The amount you see during checkout is exactly what
                    you'll pay—no hidden fees or surprise charges. We want you
                    to focus on planning your trip without worrying about
                    unexpected costs.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel className="border focus:border-primary">
                <Accordion.Title className="hover:bg-fourth text-black focus:bg-fourth transition-all duration-500">
                  Can I modify my booking after confirmation?
                </Accordion.Title>
                <Accordion.Content className="bg-gray-500/20 backdrop-blur-lg ">
                  <p className="mb-2 text-black">
                    Yes, you can modify your booking after confirmation, but
                    changes are subject to the policies of the service provider
                    (airline, hotel, etc.). Depending on the changes, additional
                    fees may apply. Our customer support team is available 24/7
                    to assist you with any modifications.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccordionHome;
