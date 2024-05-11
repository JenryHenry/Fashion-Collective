import { Box, Grid, Button, Card, Text, HoverCard } from '@radix-ui/themes';

const Outfits = ({ outfitData }) => {
    return (
        <>
        {outfitData.outfits.map((outfit) => (
                <Box key={outfit._id}>
                    <Card variant='surface' size='4'>
                    <Text as='h1' weight='bold'>{outfit.outfitName[0].toUpperCase() + outfit.outfitName.slice(1)}</Text>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                    <Card>
                    {(() => {
                        if (outfit.top) {
                            return <img src={ './images/' + outfit.top.image} alt="outfit top" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.bottom) {
                            return <img src={ './images/' + outfit.bottom.image} alt="outfit bottom" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.shoes) {
                            return <img src={ './images/' + outfit.shoes.image} alt="outfit shoes" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                        {(() => {
                        if (outfit.accessories[0]) {
                            return <img src={ './images/' + outfit.accessories[0].image} alt="outfit accessory 1" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.accessories[1]) {
                            return <img src={ './images/' + outfit.accessories[1].image} alt="outfit accessory 2" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                    {(() => {
                        if (outfit.accessories[2]) {
                            return <img src={ './images/' + outfit.accessories[2].image} alt="outfit accessory 3" style={{
                                width: 150,
                                height: 150,
                            }}/>
                        }
                    }) ()}
                    </Card>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                            <Text>Card</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                    </Card>
                </Box>
        ))}
        </>
    )
}

export default Outfits;