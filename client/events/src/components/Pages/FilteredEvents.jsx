import React from "react";
import moment from "moment";

const FilteredEvents = ({ filteredEvents }) => {
  return (
    <div className="flex flex-wrap gap-5 mt-10">
        {filteredEvents.map((e) => {
                return (
                  <>
                    {e.status === "APPROVED" ? (
                      <>
                        <div className="cursor-pointer parent mt-6">
                          <div className="rounded-xl max-w-52 overflow-hidden ">
                            <div className="flex flex-col">
                              <div
                                className="img "
                                onClick={() => handleClick(e._id)}
                              >
                                <img
                                  className="h-80 w-full object-cover rounded-xl"
                                  src={e.image}
                                  alt=""
                                />
                              </div>
                              <div className="content p-3">
                                <div>
                                  <p className="text-xl font-bold">{e.title}</p>
                                  <p className="text-gray-500 font-medium ">
                                    {e.category}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </>
                );
              })}
    </div>
  );
};

export default FilteredEvents;
