<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { loadStripe } from '@stripe/stripe-js';
import CommonService from '../../service/common.service'

const schema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  amount: yup.number().required("Amount is required!"),
});

function handleCheckout(data) {
    console.log(data, 'data');
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user, 'token');
    //console.log(store.state);
    CommonService.charge(data).then(
        async (response) => {
        if(response.id) {
            const { id } = response;

            // Load Stripe
            const stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);

            // Redirect to Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId: id });

            if (error) {
            console.error('Error redirecting to checkout:', error);
            }
        }
    },
    (error) => {

    })
}
</script>
<template>
  <h1 class="mt-5">Stripe page</h1>
  <div class="card">
    <Form @submit="handleCheckout" :validation-schema="schema">
        <div class="row m-1">
            <div class="col-md-2 justify-content-center">
                <Label class="h5">Email</Label>
            </div>
            <div class="col-md-4">
                <Field type="email" name="email" class="form-control form-control-lg" placeholder="Enter a valid email address"/>
                <ErrorMessage name="email" style="color: red" />
            </div>
        </div>
        <div class="row m-1">
            <div class="col-md-2 justify-content-center">
                <Label class="h5">Amount</Label>
            </div>
            <div class="col-md-4">
                <Field type="text" name="amount" class="form-control form-control-lg" placeholder="Enter a valid amount"/>
                <ErrorMessage name="amount" style="color: red" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6 text-right">
                <button class="btn btn-dark" type="submit">Pay Now</button> 
            </div>
        </div>
    </Form>
  </div>
</template>