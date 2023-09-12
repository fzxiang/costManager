<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />

  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    style="margin-top: 20px"
    @keypress.enter="onClickSSO"
  >
    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <Button block size="large" shape="round" @click="onClickSSO">
        <Space>
          <SvgIcon name="work-wechat" />
          <span> 企业微信SSO登录 </span>
        </Space>
      </Button>
      <!-- <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled /> -->
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, onMounted } from 'vue';

  import { Form, Button, Space } from 'ant-design-vue';
  // import {
  //   GithubFilled,
  //   WechatFilled,
  //   AlipayCircleFilled,
  //   PoweroffOutlined,
  //   GoogleCircleFilled,
  //   TwitterCircleFilled,
  // } from '@ant-design/icons-vue';
  import { SvgIcon } from '/@/components/Icon';
  // import WorkWeChat from '/@/icons/WorkWeChat.vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import {
    LoginStateEnum,
    useLoginState,
    useFormRules,
    // useFormValid
  } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { onKeyStroke } from '@vueuse/core';

  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
  });

  // const { validForm } = useFormValid(formRef);

  onKeyStroke('Enter', onClickSSO);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  // async function handleLoginForm() {
  //   const data = await validForm();
  //   if (!data) return;
  //   try {
  //     loading.value = true;
  //     const userInfo = await userStore.login({
  //       password: data.password,
  //       username: data.account,
  //       mode: 'none', //不要默认的错误提示
  //     });
  //     if (userInfo) {
  //       notification.success({
  //         message: t('sys.login.loginSuccessTitle'),
  //         description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
  //         duration: 3,
  //       });
  //     }
  //   } catch (error) {
  //     createErrorModal({
  //       title: t('sys.api.errorTip'),
  //       content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
  //       getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
  //     });
  //   } finally {
  //     loading.value = false;
  //   }
  // }

  async function handleLoginSSO(parmas) {
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        ...parmas,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }

  function onClickSSO() {
    const url = new URL(import.meta.env.VITE_SSO_LOGIN_URL);
    url.pathname = '/login';
    url.searchParams.set('service', location.origin);
    url.searchParams.set('url', location.origin);
    location.href = url.href;
  }

  // 企业微信SSO登录
  onMounted(() => {
    const url = new URL(location.href);
    const ticket = url.searchParams.has('ticket');
    if (ticket) {
      handleLoginSSO({ ticket: url.searchParams.get('ticket') });
    }
  });
</script>
