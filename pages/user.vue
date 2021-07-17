<template>
  <div class="">
    <signout />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
// const db = firebase.firestore();
// const todoRef = db.collection('user')
// console.log(todoRef);

  export default {
    signout: () => import('~/components/Signout'),

   async created() {
     const user = this.$store.getters.user
    //  console.log(user.uid);

    var userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

    // console.log(userDoc);
      if (!userDoc.exists) {
        // Firestore にユーザー用のドキュメントが作られていなければ作る
        await userDoc.ref.set({
          screen_name: user.uid,
          display_name: '名無しさん',
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        console.log(userDoc.data());
        // await userDoc.then((doc) => {
        //   console.log("Document data:", doc.data());
        // })
      }
    },
  }
</script>

<style lang="scss"></style>
