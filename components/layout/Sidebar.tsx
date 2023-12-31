import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
const Sidebar = () => {
	const { data: currentUser } = useCurrentUser();
	const items = [
		{
			icon: BsHouseFill,
			label: "Home",
			href: "/",
		},
		{
			icon: BsBellFill,
			label: "Notifications",
			href: "/notifications",
			auth: true,
			alert: false,
		},
		{
			icon: FaUser,
			label: "Profile",
			href: `/users/${currentUser?.id}`,
			auth: true,
		},
	];
	return (
		<div className="col-span-1 h-full">
			<div className="flex">
				<div className="space-y-2">
					<SidebarLogo />
					{items.map((item) => (
						<SidebarItem
							key={item.href}
							alert={item.alert}
							auth={item.auth}
							href={item.href}
							icon={item.icon}
							label={item.label}
						/>
					))}
					{currentUser && (
						<SidebarItem
							onClick={() => signOut()}
							icon={BiLogOut}
							label="Logout"
						/>
					)}
					<SidebarTweetButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
