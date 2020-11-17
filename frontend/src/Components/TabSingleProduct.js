import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    OutlinedInput,
    TextField,
} from "@material-ui/core";

import avater from "../image/fresh_chinigura.png";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    userAvatar: {
        maxHeight: 100,
        maxWidth: 100,
        objectFit: "fill",
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [RatingValue, setRatingValue] = React.useState(5);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    aria-label="full width tabs example"
                >
                    <Tab label="Comments" {...a11yProps(0)} />
                    <Tab label="Review" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Typography component="legend" style={{ marginBottom: 8 }}>
                        Comment:
                    </Typography>
                    <form>
                        <TextField
                            id="reviewText"
                            placeholder="empty"
                            required
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            style={{ marginBottom: 8 }}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Send
                            </Button>
                        </div>
                    </form>

                    <div style={{ margin: 16 }}></div>

                    <Box style={{ display: "flex", marginBottom: 16 }}>
                        <Card style={{ marginRight: 16 }}>
                            <CardContent>
                                <CardMedia
                                    className={classes.userAvatar}
                                    component="img"
                                    image={avater}
                                    title="Contemplative Reptile"
                                />
                            </CardContent>
                        </Card>
                        <Card style={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    User Name
                                </Typography>
                                <Typography variant="body2" component="p">
                                    feel free to comment about anything of this
                                    product................
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box style={{ display: "flex", marginBottom: 16 }}>
                        <Card style={{ marginRight: 16 }}>
                            <CardContent>
                                <CardMedia
                                    className={classes.userAvatar}
                                    component="img"
                                    image={avater}
                                    title="Contemplative Reptile"
                                />
                            </CardContent>
                        </Card>
                        <Card style={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    User Name
                                </Typography>
                                <Typography variant="body2" component="p">
                                    feel free to comment about anything of this
                                    product................
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Typography component="legend" style={{ marginBottom: 8 }}>
                        Rate This Product
                    </Typography>
                    <form>
                        <Rating
                            name="ratingGiven"
                            value={RatingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                        <div style={{ marginBottom: 8 }}></div>
                        <OutlinedInput
                            id="reviewerName"
                            value={"Name"}
                            readOnly
                            fullWidth
                            multiline
                            style={{ marginBottom: 8 }}
                        />
                        <TextField
                            id="reviewText"
                            placeholder="empty"
                            fullWidth
                            multiline
                            rows={8}
                            variant="outlined"
                            style={{ marginBottom: 8 }}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Send
                            </Button>
                        </div>
                    </form>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
