import { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ColorInfo = ({ color }) => {
    const [tooltipText, setTooltipText] = useState('Copy');

    const handleCopyClick = (textToCopy) => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setTooltipText('Copied');
                setTimeout(() => setTooltipText('Copy'), 1000); // Reset tooltip after 1 second
            });
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>Color Info</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    {color.name ? (
                        <OverlayTrigger
                            placement="top-end"
                            overlay={
                                <Tooltip id={`tooltip-${color.name}`}>
                                    {tooltipText}
                                </Tooltip>
                            }
                        >
                            <div onClick={() => handleCopyClick(color.name)}>
                                Name: {color.name}
                            </div>
                        </OverlayTrigger>
                    ) : (
                        <div>Name:</div>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    {color.hex ? (
                        <OverlayTrigger
                            placement="top-end"
                            overlay={
                                <Tooltip id={`tooltip-${color.hex}`}>
                                    {tooltipText}
                                </Tooltip>
                            }
                        >
                            <div onClick={() => handleCopyClick(color.hex)}>
                                HEX: {color.hex}
                            </div>
                        </OverlayTrigger>
                    ) : (
                        <div>HEX:</div>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    {color.rgb ? (
                        <OverlayTrigger
                            placement="top-end"
                            overlay={
                                <Tooltip id={`tooltip-${color.rgb}`}>
                                    {tooltipText}
                                </Tooltip>
                            }
                        >
                            <div onClick={() => handleCopyClick(color.rgb)}>
                                RGB: {color.rgb}
                            </div>
                        </OverlayTrigger>
                    ) : (
                        <div>RGB:</div>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default ColorInfo;
