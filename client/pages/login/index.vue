<template>
	<div>
		<v-row justify="center" align="center" class="mt-6">
			<v-col cols="6" lg="6" xs="12" sm="12" md="12">
				<v-card elevation="6">
					<v-card-title>Sign In Here</v-card-title>
					<v-divider></v-divider>
					<v-card-text>
						<v-form>
							<v-text-field
								v-model="userLogin.username"
								label="Enter Username"
								required
							></v-text-field>
							<v-text-field
								v-model="userLogin.password"
								label="Enter Password"
								required
								type="password"
							></v-text-field>
							<v-btn
								:disabled="Boolean(!userLogin.username || !userLogin.password)"
								block
								color="primary"
								class="mr-4"
								@click.prevent="loginUser"
							>
								LOGIN
							</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	layout: 'unauth',

	data() {
		return {
			userLogin: {
				username: '',
				password: '',
			}
		}
	},

	methods: {
		async loginUser() {
			try{
				await this.$auth.loginWith('local', {
					data: {
						username: this.userLogin.username,
						password: this.userLogin.password,
					}
				})

				this.$router.push('/instances')

			} catch (ex) {
				console.log(ex)
			}
		},
	},

}
</script>
