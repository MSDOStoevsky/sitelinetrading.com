import * as React from "react";
import styled from "@emotion/styled";
import {
	Title,
	Text,
	Grid,
	Button,
	NumberInput,
	Stack,
	Space,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ListingDetailImage } from "../../components/ListingDetailImage";
import { Discussion } from "./Discussion";
import { CartPreview } from "../../components/CartPreview";

const Wrapper = styled.div`
	min-width: 10rem;
	height: 100%;
`;

const AddToCartWrapper = styled.div`
	display: flex;
	gap: 1rem;
`;

export function Listing() {
	const [isCartPreviewOpen, setIsCartPreviewOpen] =
		React.useState<boolean>(false);
	return (
		<Wrapper>
			<Grid justify="space-between">
				<Grid.Col sm={12} lg={6}>
					<Carousel
						mx="auto"
						slideGap="xs"
						breakpoints={[
							{ maxWidth: "md", slideSize: "50%" },
							{ maxWidth: "sm", slideSize: "100%", slideGap: 0 },
						]}
						withIndicators
					>
						<Carousel.Slide>
							<ListingDetailImage />
						</Carousel.Slide>
						<Carousel.Slide>
							<ListingDetailImage />
						</Carousel.Slide>
					</Carousel>
				</Grid.Col>
				<Grid.Col sm={12} lg={6}>
					<Stack>
						<Title order={2}>Glock 19</Title>
						<Title order={3}>$600.00</Title>
						<Text>
							The GLOCK 19 in 9 mm Luger is ideal for a versatile
							role thanks to its reduced dimensions when compared
							to the standard sized option. In addition to its use
							as a conventional service pistol, it is ideal for
							use as a backup weapon or for concealed carry
							purpose.
						</Text>
						<AddToCartWrapper>
							<NumberInput defaultValue={1} min={1}></NumberInput>
							<Button onClick={() => setIsCartPreviewOpen(true)}>
								Add to Cart
							</Button>
						</AddToCartWrapper>
						<div>
							<Title order={4}>Product Details</Title>
							<Text>
								1 Length (Overall)** 187 mm | 7.36 inch 2 Slide
								Length 174 mm | 6.85 inch 3 Width (Overall) 32
								mm | 1.26 inch 4 Slide Width 25,5 mm | 1.0 inch
								5 Height incl.Mag. 128 mm | 5.04 inch 6 Line of
								Sight (Polymer) 153 mm | 6.02 inch Line of Sight
								(Steel) 152 mm | 5.98 inch Line of Sight (GNS)
								151 mm | 5.94 inch
							</Text>
						</div>
					</Stack>
				</Grid.Col>
			</Grid>
			<Space h="xl" />
			<Discussion />
			<CartPreview
				isOpen={isCartPreviewOpen}
				onClose={() => {
					setIsCartPreviewOpen(false);
				}}
			/>
		</Wrapper>
	);
}
