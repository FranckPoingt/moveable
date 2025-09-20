import * as React from "react";
import { Able, MoveableProps } from "./types";
import { InitialMoveable } from "./InitialMoveable";
import { loadAbles, preloadAbles } from "./ables/DynamicAbleLoader";

export interface DynamicMoveableProps extends Omit<MoveableProps, "ables"> {
    /**
     * Names of ables to load dynamically
     */
    ables?: string[];
    /**
     * Preload ables for faster access
     */
    preloadAbles?: string[];
    /**
     * Callback when ables are loaded
     */
    onAblesLoaded?: (ables: Able[]) => void;
    /**
     * Callback when able loading fails
     */
    onAblesLoadError?: (error: Error) => void;
    /**
     * Show loading state while ables are being loaded
     */
    loading?: React.ReactNode;
}

interface DynamicMoveableState {
    loadedAbles: Able[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * Moveable component that loads ables dynamically on demand
 */
export class DynamicMoveable extends React.Component<DynamicMoveableProps, DynamicMoveableState> {
    private moveableRef = React.createRef<InitialMoveable>();

    constructor(props: DynamicMoveableProps) {
        super(props);
        this.state = {
            loadedAbles: [],
            isLoading: false,
            error: null,
        };
    }

    async componentDidMount() {
        const { ables = [], preloadAbles: preload = [] } = this.props;

        // Preload ables if specified
        if (preload.length > 0) {
            preloadAbles(preload).catch(console.warn);
        }

        // Load required ables
        if (ables.length > 0) {
            await this.loadAbles(ables);
        }
    }

    async componentDidUpdate(prevProps: DynamicMoveableProps) {
        const { ables = [] } = this.props;
        const prevAbles = prevProps.ables || [];

        // Check if ables list changed
        if (JSON.stringify(ables) !== JSON.stringify(prevAbles)) {
            await this.loadAbles(ables);
        }
    }

    private async loadAbles(ableNames: string[]) {
        if (ableNames.length === 0) {
            this.setState({ loadedAbles: [], isLoading: false, error: null });
            return;
        }

        this.setState({ isLoading: true, error: null });

        try {
            const loadedAbles = await loadAbles(ableNames);
            this.setState({
                loadedAbles,
                isLoading: false,
                error: null,
            });
            this.props.onAblesLoaded?.(loadedAbles);
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.setState({
                loadedAbles: [],
                isLoading: false,
                error: err,
            });
            this.props.onAblesLoadError?.(err);
        }
    }

    render() {
        const { ables, preloadAbles, onAblesLoaded, onAblesLoadError, loading, ...moveableProps } = this.props;
        const { loadedAbles, isLoading, error } = this.state;

        // Show loading state
        if (isLoading && loading) {
            return loading;
        }

        // Show error state
        if (error) {
            console.error("DynamicMoveable: Failed to load ables:", error);
            // Return empty div or error component
            return <div data-error="failed-to-load-ables" style={{ display: "none" }} />;
        }

        // Create Moveable class with loaded ables
        class DynamicMoveableInstance extends InitialMoveable<MoveableProps> {
            public static defaultAbles: Able[] = loadedAbles;
        }

        return <DynamicMoveableInstance ref={this.moveableRef} {...moveableProps} />;
    }

    // Expose moveable methods
    public get moveable() {
        return this.moveableRef.current;
    }
}

/**
 * Hook for using dynamic moveable in functional components
 */
export function useDynamicMoveable(ableNames: string[]) {
    const [ables, setAbles] = React.useState<Able[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        if (ableNames.length === 0) {
            setAbles([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        loadAbles(ableNames)
            .then((loadedAbles) => {
                setAbles(loadedAbles);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err : new Error(String(err)));
                setAbles([]);
                setIsLoading(false);
            });
    }, [JSON.stringify(ableNames)]);

    return { ables, isLoading, error };
}

export default DynamicMoveable;
