/* eslint-disable */
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {ExpandMoreOutlined} from "@material-ui/icons";
import {useState} from "react";

export default function OnlineTutoringFAQ() {
    const [current, setCurrent] = useState(-1);

    const changeState = (panel) => (e, newValue) => {
        setCurrent(newValue? panel : -1);
    }

    return (
        <div style={{margin: 50, zIndex: 0}}>
            <Accordion expanded={current===0} onChange={changeState(0)}>
                <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                    <Typography align="left">
                        <h3><b>How to use Online Tutoring service?</b></h3>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="p" style={{ wordWrap: "break-word" }} align="left">
                        <b>For Callee:</b> copy your Online Tutoring ID and send it to your caller. <b>For Caller:</b> input your callee's Online Tutoring ID and call.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={current===1} onChange={changeState(1)}>
                <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                    <Typography  align="left">
                       <h3><b> Can't see your video?</b></h3>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography  variant="p" style={{ wordWrap: "break-word" }} align="left">
                        Please make sure to check accessibility of your browser to allow FindMyTutor to access your camera and microphones.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
