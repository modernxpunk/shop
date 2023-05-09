"use client";
import Icon from "./Icon";

const ModalAccount = () => {
	return (
		<>
			<input type="checkbox" id="modal-account" className="modal-toggle" />
			<label
				htmlFor="modal-account"
				className="cursor-pointer modal sm:modal-middle"
			>
				<label className="relative m-4 mb-0 modal-box sm:m-0" htmlFor="">
					<label
						className="absolute top-2 right-2 btn btn-sm btn-circle"
						htmlFor="modal-account"
					>
						✕
					</label>
					<h4 className="text-3xl font-bold">Login</h4>
					<form>
						<div className="gap-4 mt-6 form-control">
							<div className="flex flex-col">
								<label className="text-sm font-bold opacity-70" htmlFor="email">
									EMAIL
								</label>
								<label className="input-group">
									<span className="opacity-80">
										<Icon className="w-6 h-6" name="account" />
									</span>
									<input className="w-full input input-bordered" type="text" />
								</label>
							</div>
							<div className="flex flex-col">
								<label
									className="text-sm font-bold opacity-70"
									htmlFor="password"
								>
									PASSWORD
								</label>
								<label className="input-group">
									<span className="text-sm font-bold opacity-80">
										<Icon className="w-6 h-6" name="account" />
									</span>
									<input
										className="w-full input input-bordered"
										type="password"
									/>
								</label>
								<label className="py-0 mt-2 label">
									<a className="underline label-text-alt" href="#">
										Don&apos;t have an account?
									</a>
									<a className="text-right underline label-text-alt" href="#">
										Forgot password?
									</a>
								</label>
							</div>
						</div>
						<input
							className="w-full mt-4 btn btn-primary"
							type="submit"
							value="LOGIN"
						/>
						<div className="divider">or</div>
						<button className="w-full gap-2 btn btn-outline">
							<Icon className="w-6 h-6" name="account" />
							Continue with Google
						</button>
					</form>
				</label>
			</label>
		</>
	);
};

export default ModalAccount;
