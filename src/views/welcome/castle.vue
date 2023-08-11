<template>
  <div style="height: 100%">
    <div :class="checked ? 'scene' : 'scene checked'" @click="handleChange">
      <!--太陽月亮-->
      <div class="sun"></div>
      <div class="moon"></div>
      <!--左上角文字-->
      <div class="lefttopText">
        <!--        <div class="blueblock"></div>-->
        <h5>A DAY<br />ON THE ISLAND</h5>
        <h1
          >亲爱的，{{ nickName }}<br /><span>{{ text }}</span></h1
        >
        <p>欢迎来到{{ projectName }}</p>
      </div>
      <div class="allstars">
        <div class="star1"></div>
        <div class="star2"></div>
        <div class="star3"></div>
        <div class="star4"></div>
        <div class="star5"></div>
        <div class="star6"></div>
        <div class="star7"></div>
        <div class="star8"></div>
        <div class="star9"></div>
        <div class="star10"></div>
        <div class="star11"></div>
        <div class="star12"></div>
        <div class="star13"></div>
        <div class="star14"></div>
        <div class="star15"></div>
        <div class="star16"></div>
        <div class="star17"></div>
        <div class="star18"></div>
        <div class="star19"></div>
        <div class="star20"></div>
        <div class="star21"></div>
        <div class="star22"></div>
        <div class="star23"></div>
        <div class="star24"></div>
        <div class="star25"></div>
        <div class="star26"></div>
        <div class="star27"></div>
        <div class="star28"></div>
        <div class="star29"></div>
        <div class="star30"></div>
      </div>
      <!--建築物們-->
      <div class="building">
        <div class="house1">
          <div class="window">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="house2">
          <div class="door"></div>
        </div>
        <div class="house3">
          <div class="wall">
            <div class="window"></div>
          </div>
          <div class="wall">
            <div class="window"></div>
          </div>
          <div class="wall">
            <div class="window"></div>
          </div>
          <div class="roof">
            <div class="rooftop">
              <div class="cross"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  /* eslint-disable prettier/prettier */
  import { defineComponent, ref, onMounted } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { getTimeState } from '/@/utils/dateUtil';
  // import { getPermCode } from '/@/api/sys/user';

  export default defineComponent({
    name: 'WelcomeCastle',
    setup() {
      const userStore = useUserStore();
      const checked = ref(true);
      const nickName = userStore?.getUserInfo?.realName;
      const { status, text } = getTimeState();
      checked.value = status === 'night';
      function handleChange() {
        // checked.value = !checked.value;
      }

      onMounted(async () => {
        console.log(userStore.getUserInfo);
        // await getPermCode();
      });
      const projectName = import.meta.env.VITE_GLOB_APP_TITLE;
      return {
        nickName,
        text,
        checked,
        handleChange,
        projectName,
      };
    },
  });
</script>

<style scoped>
  @keyframes falling {
    0% {
      transform: translate(100px, 0);
      opacity: 0;
    }

    70% {
      opacity: 1;
    }

    100% {
      transform: translate(0, 200px);
      opacity: 0;
    }
  }

  @keyframes moon-appear {
    0% {
      box-shadow: inset 0 0 rgb(255 255 255 / 90%);
    }

    100% {
      box-shadow: inset 10px -10px rgb(255 255 255 / 90%);
    }
  }

  .scene {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(#1d2b49, #1a45a0, #91cdff, #fff);
    background-size: 100% 300%;
    box-shadow: 0 0 30px rgb(0 0 0 / 30%);
    cursor: pointer;
  }

  .lefttopText {
    margin-top: 30px;
    margin-left: 30px;
  }

  .lefttopText h1 {
    margin-top: 0;
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 3px;
  }

  .lefttopText h5 {
    margin-bottom: 0;
    opacity: 0.6;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .lefttopText p {
    opacity: 0.6;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 24px;
  }

  .lefttopText .blueblock {
    width: 20px;
    height: 25px;
    border-radius: 0;
    background-color: #7cb1ff;
  }

  .building {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: scale(0.95);
  }

  [class^='house'] {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .house1 {
    z-index: 1;
    width: 180px;
    height: 200px;
    border-radius: 0;
    background-color: #fafaf5;
    box-shadow: -50px 0 #e3e2cf inset;
  }

  .house1 .window {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100px;
    margin-top: 40px;
    margin-left: 70px;
    border-radius: 20px;
    background-color: #e3e2cf;
    box-shadow: inset 8px 5px #bebdaf;
  }

  .house1 .window .circle {
    width: 20px;
    height: 20px;
    margin: 4px 4px 4px 10px;
    border-radius: 50%;
    background-color: #534d4d;
  }

  .house2 {
    z-index: 2;
    right: 130px;
    width: 240px;
    height: 170px;
    border-radius: 0;
    background-color: #fafaf5;
    box-shadow: 0 15px #8dc9fc inset, -72px 0 #e3e2cf inset;
  }

  .house2 .door {
    position: absolute;
    bottom: 0;
    left: 45px;
    width: 40px;
    height: 80px;
    border-radius: 20px 20px 0 0;
    background-color: #2c2f36;
    box-shadow: inset 10px 2px #7cb1ff;
  }

  .house3 {
    display: flex;
    z-index: 0;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 300px;
    border-radius: 0;
    background-color: #fafaf5;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  }

  .house3 .wall {
    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
  }

  .house3 .wall .window {
    width: 24px;
    height: 50px;
    margin-top: 30px;
    border-radius: 12px 12px 0 0;
    background-color: #2c2f36;
  }

  .house3 .wall::before {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    right: 0;
    width: 105%;
    height: 20px;
    border-radius: 0;
    background-color: inherit;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  }

  .house3 .wall:nth-child(1) {
    flex: 10;
    background-color: #fafaf5;
  }

  .house3 .wall:nth-child(1) .window {
    box-shadow: inset 8px 0 #7cb1ff;
  }

  .house3 .wall:nth-child(1)::before {
    z-index: 1;
  }

  .house3 .wall:nth-child(2) {
    flex: 14;
    background-color: #e3e2cf;
  }

  .house3 .wall:nth-child(2) .window {
    box-shadow: inset 0 0 #7cb1ff;
  }

  .house3 .wall:nth-child(2)::before {
    z-index: 2;
  }

  .house3 .wall:nth-child(3) {
    flex: 10;
    background-color: #bebdaf;
  }

  .house3 .wall:nth-child(3) .window {
    box-shadow: inset -8px 0 #7cb1ff;
  }

  .house3 .wall:nth-child(3)::before {
    z-index: 1;
  }

  .roof {
    position: absolute;
    top: -170px;
    right: 5px;
    width: 300px;
    height: 150px;
    border-radius: 150px 150px 0 0;
    background: linear-gradient(150deg, #6fc5ff, #0058ff);
  }

  .roof .rooftop {
    position: absolute;
    top: -14px;
    left: 50%;
    width: 28px;
    height: 14px;
    transform: translateX(-50%);
    border-radius: 14px 14px 0 0;
    background-color: #fff;
  }

  .roof .cross {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 4px;
    height: 30px;
    transform: translateX(-50%);
    border-radius: 0;
    background-color: #fff;
  }

  .roof .cross::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 15px;
    left: 50%;
    width: 20px;
    height: 4px;
    transform: translateX(-50%);
    border-radius: 0;
    background-color: #fff;
  }

  .allstars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .allstars [class^='star'] {
    width: 3px;
    height: 3px;
    animation: falling 2s infinite;
    border-radius: 50%;
    background-color: #fff;
  }

  .allstars .star1 {
    position: absolute;
    top: 4%;
    left: 77%;
    animation-delay: -0.1s;
  }

  .allstars .star2 {
    position: absolute;
    top: 23%;
    left: 91%;
    animation-delay: -0.2s;
  }

  .allstars .star3 {
    position: absolute;
    top: -7%;
    left: 10%;
    animation-delay: -0.3s;
  }

  .allstars .star4 {
    position: absolute;
    top: 4%;
    left: 54%;
    animation-delay: -0.4s;
  }

  .allstars .star5 {
    position: absolute;
    top: 30%;
    left: 53%;
    animation-delay: -0.5s;
  }

  .allstars .star6 {
    position: absolute;
    top: -21%;
    left: 36%;
    animation-delay: -0.6s;
  }

  .allstars .star7 {
    position: absolute;
    top: 49%;
    left: 39%;
    animation-delay: -0.7s;
  }

  .allstars .star8 {
    position: absolute;
    top: -8%;
    left: 45%;
    animation-delay: -0.8s;
  }

  .allstars .star9 {
    position: absolute;
    top: 30%;
    left: 68%;
    animation-delay: -0.9s;
  }

  .allstars .star10 {
    position: absolute;
    top: 35%;
    left: 70%;
    animation-delay: -1s;
  }

  .allstars .star11 {
    position: absolute;
    top: -30%;
    left: 48%;
    animation-delay: -1.1s;
  }

  .allstars .star12 {
    position: absolute;
    top: -12%;
    left: 83%;
    animation-delay: -1.2s;
  }

  .allstars .star13 {
    position: absolute;
    top: 16%;
    left: 15%;
    animation-delay: -1.3s;
  }

  .allstars .star14 {
    position: absolute;
    top: -11%;
    left: 19%;
    animation-delay: -1.4s;
  }

  .allstars .star15 {
    position: absolute;
    top: -22%;
    left: 53%;
    animation-delay: -1.5s;
  }

  .allstars .star16 {
    position: absolute;
    top: 22%;
    left: 62%;
    animation-delay: -1.6s;
  }

  .allstars .star17 {
    position: absolute;
    top: 29%;
    left: 98%;
    animation-delay: -1.7s;
  }

  .allstars .star18 {
    position: absolute;
    top: 14%;
    left: 51%;
    animation-delay: -1.8s;
  }

  .allstars .star19 {
    position: absolute;
    top: -11%;
    left: 84%;
    animation-delay: -1.9s;
  }

  .allstars .star20 {
    position: absolute;
    top: -14%;
    left: 35%;
    animation-delay: -2s;
  }

  .allstars .star21 {
    position: absolute;
    top: -2%;
    left: 66%;
    animation-delay: -2.1s;
  }

  .allstars .star22 {
    position: absolute;
    top: 34%;
    left: 31%;
    animation-delay: -2.2s;
  }

  .allstars .star23 {
    position: absolute;
    top: 5%;
    left: 79%;
    animation-delay: -2.3s;
  }

  .allstars .star24 {
    position: absolute;
    top: 14%;
    left: 54%;
    animation-delay: -2.4s;
  }

  .allstars .star25 {
    position: absolute;
    top: -17%;
    left: 23%;
    animation-delay: -2.5s;
  }

  .allstars .star26 {
    position: absolute;
    top: 15%;
    left: 25%;
    animation-delay: -2.6s;
  }

  .allstars .star27 {
    position: absolute;
    top: 33%;
    left: 72%;
    animation-delay: -2.7s;
  }

  .allstars .star28 {
    position: absolute;
    top: -13%;
    left: 52%;
    animation-delay: -2.8s;
  }

  .allstars .star29 {
    position: absolute;
    top: -20%;
    left: 99%;
    animation-delay: -2.9s;
  }

  .allstars .star30 {
    position: absolute;
    top: 48%;
    left: 95%;
    animation-delay: -3s;
  }

  .remind {
    margin-bottom: 10px;
    opacity: 0.2;
    letter-spacing: 1px;
  }

  .dayText {
    display: none;
  }

  .sun,
  .moon {
    position: absolute;
    top: 200px;
    left: 250px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .sun {
    top: 400px;
    opacity: 0;
    background-color: #ffdd38;
    box-shadow: 0 0 20px rgb(255 221 56 / 50%);
  }

  .moon {
    animation: moon-appear 5s both;
  }

  h1,
  h5,
  p,
  .moon,
  .sun,
  .scene,
  .allstars,
  .blueblock,
  .building {
    transition: 2s;
    color: #fff;
  }

  .scene.checked {
    background-position: 0 100%;
  }

  .scene.checked .allstars {
    opacity: 0;
  }

  .scene.checked h1,
  .scene.checked h5,
  .scene.checked p {
    color: #222;
  }

  .scene.checked .building {
    filter: brightness(105%);
  }

  .scene.checked .moon {
    top: -100px;
    opacity: 0;
  }

  .scene.checked .sun {
    top: 200px;
    opacity: 1;
  }

  .scene.checked .blueblock {
    background-color: white;
  }

  /* input { */

  /*  display: none; } */
</style>
