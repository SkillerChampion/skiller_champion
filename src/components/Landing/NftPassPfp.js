/* eslint-disable no-unused-vars */
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import classes from './Landing.module.css';
import wheel from '../../assets/wheel.jpg';

const data = [
  {
    title: 'Platinum Pass',
    className: classes.platinumCard,
    text: classes.platinumText,
    curvedBorder: classes.curvedBorderPlatinum,
    curvedBorderRight: classes.curvedBorderPlatinumRight,
    borderColorClassName: classes.borderColorPlatinum,
    wheel: wheel
  },
  {
    title: 'Gold Pass',
    className: classes.goldCard,
    text: classes.goldText,
    curvedBorder: classes.curvedBorderGold,
    curvedBorderRight: classes.curvedBorderGoldRight,
    borderColorClassName: classes.borderColorGold,
    wheel: wheel
  },
  {
    title: 'Silver Pass',
    className: classes.silverCard,
    text: classes.silverText,
    curvedBorder: classes.curvedBorderSilver,
    curvedBorderRight: classes.curvedBorderSilverRight,
    borderColorClassName: classes.borderColorSilver,
    wheel: wheel
  }
];

const sideBarrelsDataSet = [{ top: 15 }, { top: 100 }, { top: 185 }, { top: 270 }, { top: 360 }];

const Card = ({ item }) => (
  <div
    className={`absolute top-[40px] w-[270px] left-[115px] rounded-lg h-[380px] border-2 ${item.className} relative`}>
    <div className="w-full mx-auto flex justify-center">
      <img
        src={item.wheel}
        className={`rounded-full mx-auto w-10/12 mt-[80px] absolute ${classes.wheelAnim}`}
      />
    </div>
  </div>
);

const SideBarrels = ({ item, top, right }) => (
  <div className="absolute" style={{ top: `${top}px`, right: `${right}px` }}>
    <div className={`h-7 w-[15px] left-0 ${item.curvedBorder}`}></div>
    <div className={`h-[28px] w-[84px] left-[15.5px] mt-[-0.5px] ${item.className} absolute`}></div>
    <div className={`h-7 w-[15px] left-[100px] ${item.curvedBorderRight}`}></div>
  </div>
);

const Diagram = () => {
  return (
    <div>
      <BodyContainer>
        <div className="flex flex-col items-center gap-20 pb-20">
          {data?.map((item, index) => {
            return (
              <div className="h-full flex justify-center mt-[30px]" key={index}>
                <div
                  className={`w-[500px] h-[500px] border-2 ${item.borderColorClassName} relative rounded-lg`}>
                  <div
                    className={`h-4 w-[500px] left-[-1.5px] bottom-[-2px] absolute  ${item.className}`}></div>
                  <div
                    className={`w-[500px] text-3xl text-center bottom-[27px] absolute ${item.text} r`}>
                    {item.title}
                  </div>

                  <Card item={item} />

                  {sideBarrelsDataSet?.map((barrelItem, index) => (
                    <SideBarrels key={index} item={item} top={barrelItem.top} />
                  ))}

                  {sideBarrelsDataSet?.map((barrelItem, index) => (
                    <SideBarrels key={index} item={item} top={barrelItem.top} right={94} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </BodyContainer>
    </div>
  );
};

export default Diagram;
