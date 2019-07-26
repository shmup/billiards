import { BeginEvent } from "../events/beginevent"
import { RackEvent } from "../events/rackevent"
import { Controller } from "./controller"
import { Aim } from "./aim"
import { WatchAim } from "./watchaim"
import { AbortEvent } from "../events/abortevent"
import { End } from "./end"

/**
 * Initial state of controller.
 *
 * Transitions into active player and watcher.
 */
export class Init extends Controller {
  handleBegin(_: BeginEvent): Controller {
    this.container.broadcast(new RackEvent(this.container.table.serialise()))
    return new Aim(this.container)
  }

  handleAbort(_: AbortEvent): Controller {
    return new End(this.container)
  }

  handleRack(event: RackEvent): Controller {
    this.container.table.updateFromSerialised(event.table)
    return new WatchAim(this.container)
  }
}