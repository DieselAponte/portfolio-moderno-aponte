export type TrajectoryStatus = "COMPLETED" | "IN PROGRESS" | "ACTIVE";

export interface TrajectoryPanelData {
	id: string;
	title: string;
	subtitle: string;
	status: TrajectoryStatus;
}

export interface TrajectorySectionData extends TrajectoryPanelData {
	eyebrow: string;
	heading: string;
	summary: string;
	highlights: string[];
}

export interface TechBubble {
	id: string;
	label: string;
	top: string;
	right: string;
	delay: string;
	duration: string;
}

export interface ExperienceSlide {
	id: string;
	role: string;
	organization: string;
	timeframe: string;
	summary: string;
	tags: string[];
}

export interface ExperienceCertification {
	id: string;
	title: string;
	meta: string;
	url?: string;
	order_index: number;
}

export interface ExperienceCarouselItem {
	id: string;
	title: string;
	subtitle: string;
	image_path: string;
	order_index: number;
}

