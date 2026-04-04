export default function CourseDetials() {
  return (
    <>
      <div className="min-h-screen h-auto w-screen">
        <div className="md:max-h-2/3 h-auto bg-slate-200 flex flex-col-reverse md:flex-row md:justify-evenly md:items-center p-5 rounded-sm">
          <div className="flex flex-col md:h-[400px] md:w-[500px] p-3 ">
            <div className="p-3 text-3xl">Heading</div>
            <div className="p-3 text-lg">Body</div>
          </div>
          <img
            src="https://placehold.co/500x400"
            alt="imagePlaceholder"
            className="rounded-lg h-auto w-auto"
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row p-5 bg-slate-400 justify-center gap-32">
          <div className="flex flex-col w-auto lg:w-2/5 gap-10">
            <div className="text-3xl">
              What you'll Learn!!!
              <p className="text-lg">Master Server Side Rendering</p>
            </div>
            <div className="h-screen bg-slate-600 rounded-lg border border-slate-300 p-10 text-white">
              Contents
            </div>
          </div>
          <div className="flex flex-col border border-slate-300 rounded-lg h-fit mt-3 lg:sticky lg:top-10">
            <img src="https://placehold.co/400x300" className="rounded-lg h-auto w-auto" />
            <div className="flex flex-col justify-center items-center bg-white gap-10 h-fit">
              <div className="p-1">Purchase Detail</div>
              <button className="border border-slate-200 rounded bg-sky-400 hover:bg-sky-600 hover text-white w-full p-1">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
