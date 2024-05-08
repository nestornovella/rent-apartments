import useGetApartments from "../../hooks/custom/GetApartments";
import Transition from "../complements/transition";
import { Link } from "react-router-dom";
import { MdOutlineMoreTime } from "react-icons/md";
import {
  LiaStarSolid,
  LiaCommentsDollarSolid,
  LiaBedSolid,
  LiaBathSolid,
  LiaRulerCombinedSolid,
} from "react-icons/lia";
import {
  parseToColombianMoney,
  parseToDollarsMoney,
} from "../../utils/parseMoney";
import useCounterHouses from "../../redux/actions/counterHauses";
import Rating from "./Rating";

function Properties(rating) {
  const { apartments, length } = useGetApartments();
  const { counter, handleCounter } = useCounterHouses();

  return (
    <Transition
      className={
        " min-w-[400px]  px-4 mb-0 ms:mt-0 mt-[300px] md:mt-20  md:px-10 xl:px-40"
      }
    >
      <section className="grid grid-cols-2 gap-4 md:gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {apartments &&
          apartments.map(
            (
              {
                availability,
                bathrooms,
                bedrooms,
                description,
                id,
                images,
                lat,
                lon,
                name,
                price,
                size,
                status,
                rating,
                ubication,
                userId,
              },
              index
            ) => {
              return (
                index < counter && (
                  <Link
                    className="shadow-light hover:shadow-xl font-quicksand rounded-2xl transition-all duration-300 cursor-pointer"
                    key={id}
                    to={`/apartment/${id}`}
                  >
                    <div className="relative ">
                      <div className="relative">
                        <div className="absolute text-secondary flex items-center px-2 rounded-lg bg-slate-50 top-2 right-2">
                          <Rating apartmentId={id} initialRating={rating} className="text-yellow-400" />
                          <span className=" text-sm ml-1 font-semibold py-1">
                            {rating && rating.media}
                          </span>
                        </div>
                        <img
                          src={images && images[0]}
                          alt="furnished, amoblados, apartments, apartamentos, alquiler, rent"
                          className="object-cover w-full max-h-full h-[280px] rounded-t-2xl"
                        />
                        <div className="px-3 py-5">
                          <p className="text-secondary">{ubication}</p>
                          <div className="">
                            <div className="flex">
                              <LiaCommentsDollarSolid className="mr-2 text-green-800" />
                              <p className=" font-bold">
                                {parseToColombianMoney(price)}
                              </p>
                            </div>
                            <div className="gap-4 mt-2 lg:flex">
                              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                                <LiaBedSolid />
                                <span className="ml-2 text-xs">{bedrooms}</span>
                              </div>
                              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                                <LiaBathSolid />
                                <span className="ml-2 text-xs">
                                  {bathrooms}
                                </span>
                              </div>
                              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                                <LiaRulerCombinedSolid />
                                <span className="ml-2 text-xs">{size}</span>
                              </div>
                              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-black">
                                <span className="text-xs font-bold text-white">{status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              );
            }
          )}
      </section>
      {counter < length && (
        <div className="text-center my-7 rounded-3xl">
          <button
            onClick={handleCounter}
            className="mx-auto block xl:mt-20 mt-5 text-xl  bg-secondary rounded-xl px-5 py-5 font-quicksand  text-white hover:bg-black"
          >
            See more
          </button>
        </div>
      )}
    </Transition>
  );
}

export default Properties;